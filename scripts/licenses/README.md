# License recognition templates

The sync uses exact normalized standard license text, not title or substring matching. It ignores whitespace and only the complete, explicitly reviewed copyright attribution lines listed in `scripts/lib/license-policy.mjs`. A new owner, year, or appended sentence stays in the normalized text and blocks mirroring until reviewed. It never strips an arbitrary copyright line; added or changed legal prose is not recognized.

- `MIT.txt`: standard MIT text, copied from the installed `is-extendable` package license. Copyright attribution is retained.
- `Apache-2.0.txt`: standard Apache 2.0 text with appendix, from `anthropics/skills` commit `8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4`, `skills/algorithmic-art/LICENSE.txt`. Copyright attribution is retained.

Only MIT and Apache full texts are recognized automatically. Other supported open licenses require an exact SPDX declaration or supported exact alias. Unknown or modified license documents withhold the mirrored body and remain archived for manual review.

Reviewed attribution variants cover the template author Jon Schlinkert, K-Dense Inc., Beifang Niu (K-Dense pacsomatic), Notion Labs, Inc., Anthropic, PBC., and the standard Apache appendix placeholder. Matching includes the exact year and punctuation shown in the policy; the original evidence file still retains every attribution line.
