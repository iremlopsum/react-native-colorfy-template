import React, { useEffect, useState, memo, Fragment } from 'react'
import { View, StyleSheet } from 'react-native'

import ScreenLoader from './ScreenLoader'

interface Props {
  children: JSX.Element | JSX.Element[]
  loader?: JSX.Element
  showContent?: boolean
  backgroundColor?: string
  loaderColor?: string
}

const WaitForThread = ({
  children,
  loader,
  backgroundColor,
  loaderColor,
  showContent,
}: Props): JSX.Element => {
  const [interactionsDone, setInteractionsDone] = useState(false)

  useEffect(() => {
    let timer: number | undefined

    if (typeof showContent === 'undefined') {
      timer = window.setTimeout(() => {
        setInteractionsDone(true)
      }, 10)
    }

    return (): void => clearTimeout(timer)
  }, [showContent])

  return (
    <View style={styles.container}>
      {(interactionsDone ||
        (typeof showContent !== 'undefined' && showContent)) && (
        <Fragment>{children}</Fragment>
      )}
      {loader || (
        <ScreenLoader
          shown={
            (typeof showContent !== 'undefined' && !showContent) ||
            (typeof showContent === 'undefined' && !interactionsDone)
          }
          backgroundColor={backgroundColor}
          loaderColor={loaderColor}
        />
      )}
    </View>
  )
}

export default memo(WaitForThread)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
