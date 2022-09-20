import { useEffect, useState } from "react";
import Modal from "./Modal";
import styles from './ResourceInfoModal.module.css';
import { TemplateGroup, TokenParameter } from "../models/template-groups.model"
import CountUp from "./CountUp";


interface ParameterGroupArgs {
  title: string;
  items: TokenParameter[],
  type: 'input' | 'output'
}
const ParameterGroup = ({ title, items, type }: ParameterGroupArgs) => {
  const parameter: keyof TokenParameter = type === 'input' ? 'inputAmountPerCollectionStrength' : 'outputAmountPerCollectionStrength'
  const parameterClass = type === 'input' ? 'paramRed' : 'paramGreen'
  const sign = type === 'input' ? '-' : '+';
  return (
    <div className={styles.parameterGroup}>
      <div className={styles.title}>{title}</div>
      {items.length === 0 ? (
        <h4 className={styles.noEntries}>There was no {title.toLowerCase()}</h4>
      ) : (
        <ul className={styles.parameterList}>
          {items.map(item => (<li key={item.token.id} className={styles.parameter}>
            <span>{item.token.name}</span>
            <span className={styles[parameterClass]}>
              {sign} <CountUp value={+item[parameter] * +item.passiveMultiplier} duration={2000} /> / hr
            </span>
          </li>))}
        </ul>
      )}
    </div>
  )
}



interface ResourceInfoModalArgs {
  item: TemplateGroup | null;
  onClose: () => void
}
const ResourceInfoModal = ({ item, onClose }: ResourceInfoModalArgs) => {
  const [data, setData] = useState<TemplateGroup | null>(null);
  const [consumptionItems, setConsumptionItems] = useState<TokenParameter[]>([])
  const [productionItems, setProductionItems] = useState<TokenParameter[]>([])
  useEffect(() => {
    if (item) {
      setData(item)
      setConsumptionItems(item.tokenParameters.filter(item => +item.inputAmountPerCollectionStrength > 0))
      setProductionItems(item.tokenParameters.filter(item => +item.outputAmountPerCollectionStrength > 0))
    }
  }, [item])
  if (!data) return null;
  return (
    <Modal title={data.name} handleClose={onClose} isOpen={!!item}>
      <div className={styles.body}>
        <ParameterGroup title="Consumption" items={consumptionItems} type="input" />
        <ParameterGroup title="Production" items={productionItems} type="output" />
      </div>
    </Modal>)

}

export default ResourceInfoModal;