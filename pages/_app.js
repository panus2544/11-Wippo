import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.css'


export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>
            ระบบจัดการค่าย Wip Camp #11
          </title>
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}
