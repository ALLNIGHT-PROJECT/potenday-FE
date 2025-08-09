// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Mixed Content 문제 해결을 위한 Content-Security-Policy 설정 */}
                    <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;