"""Run against the exported site: SITE_BASE=http://127.0.0.1:4327 python tests/browser-smoke.py.

Requires Python Playwright and Chrome. The server must map /updates to updates.html,
as Cloudflare Pages does. Screenshots and the result JSON go to SMOKE_OUTPUT (/tmp by default).
"""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get("SITE_BASE", "http://127.0.0.1:4327")
OUTPUT = Path(os.environ.get("SMOKE_OUTPUT", "/private/tmp/aiskills-weekly-smoke"))
OUTPUT.mkdir(parents=True, exist_ok=True)
errors = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel="chrome")
    context = browser.new_context(viewport={"width": 1440, "height": 1000})
    page = context.new_page()
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(BASE, wait_until="networkidle")
    expect(page.get_by_role("link", name="每週更新與新發現")).to_be_visible()
    platform = page.get_by_role("combobox", name="平台（來源文件宣告支援）")
    platform.select_option("codex")
    page.get_by_role("button", name="Hugging Face", exact=True).click()
    cards = page.locator('main a[href^="/skills/"]')
    expect(cards).to_have_count(5)
    assert "agent=codex" in page.url and "source=huggingface" in page.url
    page.reload(wait_until="networkidle")
    expect(platform).to_have_value("codex")
    expect(cards).to_have_count(5)
    page.screenshot(path=str(OUTPUT / "desktop-filter.png"), full_page=True)

    page.goto(BASE + "/?agent=codex#official", wait_until="networkidle")
    expect(platform).to_have_value("codex")
    page.get_by_role("button", name="清除篩選", exact=True).click()
    expect(platform).to_have_value("")

    page.goto(BASE + "/skills/openai--notion--notion-knowledge-capture", wait_until="networkidle")
    expect(page.get_by_role("tab", name="Codex", exact=True)).to_have_attribute("aria-selected", "true")
    expect(page.get_by_text("尚未進行任務實測", exact=True)).to_be_visible()
    assert "npx skills add" not in page.locator("#installation").inner_text()
    page.get_by_role("tab", name="Claude Code", exact=True).click()
    expect(page.get_by_text("此來源提供 Codex plugin；尚未確認在此平台的完整安裝方式。請參閱來源文件。")).to_be_visible()
    assert "cp -r" not in page.locator("#installation").inner_text()

    page.goto(BASE + "/skills/huggingface--huggingface-gradio", wait_until="networkidle")
    example_links = page.locator('article a[href*="examples.md"]')
    assert example_links.count() > 0
    for href in example_links.evaluate_all("links => links.map(link => link.href)"):
        assert href.startswith("https://github.com/huggingface/skills/blob/")
        assert "/skills/huggingface-gradio/examples.md" in href

    page.goto(BASE + "/updates", wait_until="networkidle")
    expect(page.get_by_role("heading", name="網路新發現", exact=True)).to_be_visible()
    expect(page.get_by_text("待評估來源", exact=True).first).to_be_visible()
    expect(page.get_by_text("最近一次搜尋未完整完成", exact=False)).to_have_count(0)
    page.screenshot(path=str(OUTPUT / "desktop-updates.png"), full_page=True)

    mobile = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
    phone = mobile.new_page()
    phone.on("pageerror", lambda error: errors.append(str(error)))
    for route in ["/", "/updates", "/skills/huggingface--huggingface-datasets"]:
        phone.goto(BASE + route, wait_until="networkidle")
        assert phone.evaluate("document.documentElement.scrollWidth <= innerWidth"), f"Horizontal overflow: {route}"
        if route == "/":
            phone.get_by_role("combobox", name="平台（來源文件宣告支援）").select_option("grok")
            expect(phone.get_by_text("找不到符合的 Skill", exact=True)).to_be_visible()
        if route.endswith("huggingface-datasets"):
            phone.get_by_role("tab", name="Cursor", exact=True).click()
            expect(phone.locator("#install-panel")).to_contain_text("-a cursor")
        phone.screenshot(path=str(OUTPUT / ("mobile-" + (route.split("/")[-1] or "home") + ".png")), full_page=True)

    offline = browser.new_context(java_script_enabled=False, viewport={"width": 390, "height": 844})
    static = offline.new_page()
    for route, text in [("/updates", "目錄更新紀錄"), ("/skills/openai--notion--notion-knowledge-capture", "收錄依據與使用條件")]:
        static.goto(BASE + route, wait_until="load")
        expect(static.get_by_role("heading", name=text, exact=True)).to_be_visible()
    browser.close()

assert not errors, errors
result = {"passed": True, "base": BASE, "checks": ["desktop filters", "URL reload and hash", "plugin installation boundary", "pinned document links", "weekly discovery", "390px overflow", "mobile tabs", "no-JS content"], "pageErrors": errors}
(OUTPUT / "result.json").write_text(json.dumps(result, ensure_ascii=False, indent=2))
print(json.dumps(result, ensure_ascii=False))
