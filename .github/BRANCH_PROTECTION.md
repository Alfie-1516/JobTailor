# Branch Protection Setup (main)

Set these after the first successful workflow run:

1. Go to `Settings` -> `Branches` -> `Add branch protection rule`.
2. Branch name pattern: `main`.
3. Enable **Require a pull request before merging**.
4. Enable **Require status checks to pass before merging**.
5. Select required checks:
   - `Frontend CI`
   - `Backend CI`
6. (Recommended) Enable:
   - **Require branches to be up to date before merging**
   - **Require conversation resolution before merging**
   - **Do not allow bypassing the above settings**

Optional later:

- Add `Frontend E2E Smoke` as a required check once secrets are configured and
  the workflow is stable.
