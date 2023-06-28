import { useEffect, useState } from "react"

export const useSelect = ( props ) =>{
    
    const [valueSelect, setvalueSelect]  = useState({})
    // const [valdefaultValue, setvaldefaultValue]   = useState({})
    const { 
        isMulti = false,
        placeholder = 'Sin definir',
        options = [] ,
        defaultValue = [], 
        maxSelections = "0",
        // maxSelections,
        label = 'Sin Definir',
        onChange,
        // onClick,
        // name,
        // valueDefault,
        className="chosen-select",
        id = '',
        name='sin_definir'
    } = props

    const selectedValues = (value, name) => {
      setvalueSelect({
          ...valueSelect,
          [name]: value 
      })
    }

    // const changeDefaultValues = (values) => {
    //   setvaldefaultValue(values)
    // } 

    useEffect(() => {
      if (!!defaultValue.length){
        selectedValues(
          defaultValue,
          name
        )
      }
    },[defaultValue] )

    useEffect(() => {
      onChange(
        name, 
        valueSelect[name] || [] , 
        valueSelect 
      )
    },[valueSelect] )

    

    return {
      isMulti,
      className,
      placeholder,
      label,
      options,
      maxSelections,
      defaultValue,
      id,
      name,
      valueSelect,
      selectedValues,
      // changeDefaultValues
    } 
}  