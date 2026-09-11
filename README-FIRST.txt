MADHYUM WEB — UNIFIED LOGIN PATCH

PUBLIC WEBSITE: DO NOT CHANGE.

Upload/replace only these paths in the existing website repository:
/login/index.html        (NEW common Admin + Agent/BDM login)
/admin/index.html        (redirects old Admin login URL to common login)
/admin/dashboard.html    (existing corrected dashboard preserved)
/agent/index.html        (redirects old Agent login URL to common login)
/agent/dashboard.html    (existing corrected dashboard preserved)

Master API:
https://script.google.com/macros/s/AKfycby1axGjQXJHFYlsvPK4O9hW-oETEKNz7nQy9pS-jkGiKE6e14ogG3oAOY1ZM0MqKOc/exec

Result:
/login/ -> one login page with Agent/BDM and Admin tabs.
/admin/ -> automatically opens common login with Admin selected.
/agent/ -> automatically opens common login with Agent/BDM selected.
Successful Admin login -> /admin/dashboard.html
Successful Agent/BDM login -> /agent/dashboard.html

No public website page, CSS, image, or content file is included in this patch.
