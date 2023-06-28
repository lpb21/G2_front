import { useState } from "react"

export const hookSelect = () => {

  const [defaultval, setvaluesDefault] = useState(valueDefault)
  const [optionsDefault, setoptionsDefault] = useState(options)

  const changedefaultval = () => {
  }

  const changeoptionsDefault = () => {
  }

  return {
    changedefaultval,
    changeoptionsDefault
  }
}