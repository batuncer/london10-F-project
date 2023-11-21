import { Button, IconButton } from "@mui/material";
import Iconify from "../iconify/Iconify";

export default function SlackLoginButton() {
    let slack_url = ""
    const slackClientId = '6209798254180.6224787694115'

    slack_url = `https://slack.com/oauth/v2/authorize?scope=&user_scope=users%3Aread%2Cusers.profile%3Aread&users%3Aread&client_id=${slackClientId}`


    function openPopup() {
        const width = 600;
        const height = 800;
        const left = window.screenX + window.innerWidth / 2 - width / 2;
        const top = window.screenY + window.innerHeight / 2 - height / 2;

        // const url = `https://slack.com/oauth/v2/authorize?scope=identity.basic,openid,identity.email&user_scope=identity.basic%2Copenid%2Cidentity.email&redirect_uri=https%3A%2F%2Flocalhost%3A443%2Fauth%2Fredirect&amp;client_id=6209798254180.6230482777808`;

        return window.open(
            slack_url,
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
        );
    }
    function handleClick() {
        polling(openPopup())
    }
    function polling(popup) {
        const polling = setInterval(() => {
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(polling)
                onFailure('Popup has been closed by user')
            }

            const closeDialog = () => {
                clearInterval(polling)
                popup.close()
            }

            try {
                if (!popup.location.hostname.includes('slack.com')) {
                    if (popup.location.search) {
                        const query = new URLSearchParams(popup.location.search)
                        const slackCode = query.get('code')

                        closeDialog()
                        if (slackCode) {
                            return onSuccess(slackCode)
                        }

                        if (onFailure) {
                            onFailure(query.get('error'))
                        }
                    }
                }
            } catch (error) {
                console.error(error)
                // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                // A hack to get around same-origin security policy errors in IE.
            }
        }, 500)
    }

    const onSuccess = (code) => {
        alert(code)
    }

    const onFailure = (error) => {
        alert(error)
    }

    return (
        <Button aria-label="Login"
            startIcon={
                <Iconify icon='devicon:slack' />}
            onClick={handleClick}>
            Slack Login
        </Button>
    )
}