import Select from "react-select";
import makeAnimated from "react-select/animated";
import React, { memo, useEffect } from "react";
import { useSelect } from "../hooks/useSelect";

/**
 * * Un componente de Select reutilizable con un label opcional.
 *
 * @param {boolean} isMulti - Indica si el Select permite múltiples selecciones.
 * @param {string} placeholderl - El placeholder que se muestra cuando no se ha seleccionado nada.
 * @param {array} options - Un array de opciones para mostrar en el Select.
 * @param {number} maxSelections - El número máximo de selecciones permitidas.
 * @param {string} label1 - El texto para el label opcional.
 * @returns {JSX.Element} - El componente SelectOptions.
 */

export const SelectOptions = memo(( props ) => {

  // validacion Hooks.

  const {
    label ,
    isMulti,
    placeholder,
    options,
    maxSelections,
    defaultValue,
    id,
    name,
    selectedValues,
    valueSelect
  }  = useSelect(props)

  useEffect(() => {
    
  }, [valueSelect] )

  useEffect(() => {
  }, [] )

  return (
    <>
    <label 
      htmlFor={label}
      >{label}
    </label>
    <Select
      id = {id}
      name = {name} 
      isMulti = {isMulti} 
      placeholder={placeholder}
      onChange = {(e) => 
        selectedValues(e, name )
      } 
      defaultValue= {defaultValue} 
      options={options}
      maxSelections= {maxSelections}
    />
  </>
  )
})
