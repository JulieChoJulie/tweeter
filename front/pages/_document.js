import React from 'react';
import Document, { NextScript, Html, Head, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enchanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (err) {
      console.error(err);
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script src="https://polyfill.io/v3/polyfill.min.js?features=es2019%2Cdefault%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2020%2Ces2021%2Ces2022" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
