<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Google rating display reads only the public saved snapshot; a secret-authenticated daily cron callback updates it with one fixed Google Places lookup, so visitors cannot trigger billable requests.
Preserve the last successful Google snapshot and timestamp on provider failures; scheduled refresh credentials live only in the RLS-locked control table.
