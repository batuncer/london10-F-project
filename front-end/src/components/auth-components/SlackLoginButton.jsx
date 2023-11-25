import { Button } from "@mui/material";
import Iconify from "../iconify/Iconify";

const slackClientId = process.env.REACT_APP_SLACK_CLIENT_ID;

export default function SlackLoginButton() {
    //let slack_url = ""
    // const slackClientId = "6209798254180.6224787694115"
    console.log(slackClientId)

    const myUrlWithParams = new URL("https://slack.com/oauth/v2/authorize");

    myUrlWithParams.searchParams.append("user_scope", "identity.basic,identity.email");
    myUrlWithParams.searchParams.append("redirect_url", `${process.env.REACT_APP_BACK_END_URL}/auth/redirect`);
    myUrlWithParams.searchParams.append("client_id", slackClientId);

    console.log(myUrlWithParams.href);
    let slack_url = myUrlWithParams.href;

    //let slack_url = `https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email&redirect_uri=https%3A%2F%2Flocalhost%3A443%2Fauth%2Fredirect&client_id=${slackClientId}`
    //https://testworkspace-9th7274.slack.com/oauth?client_id=6209798254180.6224787694115&scope=&user_scope=users%3Aread%2Cusers.profile%3Aread&redirect_uri=https%3A%2F%2Flocalhost%3A443%2Fauth%2Fredirect&state=&granular_bot_scope=1&single_channel=0&install_redirect=&tracked=1&team=1

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
                console.log(popup.location)
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
        console.log(code)
        sessionStorage.setItem("code", code);
    }

    const onFailure = (error) => {
        alert(error)
    }

    return (
        <Button aria-label="Login"
            startIcon={
                <Iconify icon='devicon:slack' />}
            onClick={handleClick}>
            Signup With Slack
        </Button>
    )
}