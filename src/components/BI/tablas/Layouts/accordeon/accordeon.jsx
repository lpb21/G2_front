import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "./chevron-down.svg";
import styles from "./styles.module.css";
import { Filtros } from '../../../filtros';

const AccordionItem = ({ header, ...rest }) => {
  return (
    <Item
      {...rest}
      header={
        <>
          {header}
          <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
        </>
      }
      className={styles.item}
      buttonProps={{
        className: ({ isEnter }) =>
          `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
      }}
      contentProps={{ className: styles.itemContent }}
      panelProps={{ className: styles.itemPanel }}
    />
  );
}
export const AccordeonFilters = () => {
  return (
    <div className={styles.app} >
      <Accordion 
      transition 
      transitionTimeout={250}
      >
        <AccordionItem 
        header="Cick Aqui para colapsar o desplegar Filtros" 
        //initialEntered
        >
        <Filtros/>
        </AccordionItem>
      </Accordion>
    </div>
  );
};



  






