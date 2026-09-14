# Deployment to DigitalOcean

The production site is a static export served by Caddy. Every push to `main`
builds and deploys it through GitHub Actions.

## One-time droplet setup

1. Point the `A` records for `izi-riders.ru` and `www.izi-riders.ru` to the
   droplet IP address.
2. Install Caddy and rsync on the droplet.
3. Create `/var/www/izi-riders` and give the deployment user ownership of it.
4. Copy `deploy/Caddyfile` to `/etc/caddy/Caddyfile`, validate it, and reload
   Caddy. Caddy will obtain and renew HTTPS certificates automatically.
5. Add the deployment user's SSH public key to `~/.ssh/authorized_keys`.

## GitHub repository secrets

- `DROPLET_HOST`: droplet IP address
- `DROPLET_USER`: SSH user that owns `/var/www/izi-riders`
- `DROPLET_SSH_KEY`: matching private Ed25519 key
- `DROPLET_KNOWN_HOSTS`: output of `ssh-keyscan -H <droplet-ip>` verified
  against the droplet's SSH host-key fingerprint

After the first successful deployment, `https://izi-riders.ru` is served from
the droplet. Future source edits only need a push to `main`.
