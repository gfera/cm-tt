import { TemplateGroup } from '../models/template-groups.model';
import styles from './ResourcesListItem.module.css';

interface ListItemParams {
  item: TemplateGroup;
  onSelect: (item: TemplateGroup) => any;
}
const ListItem = ({ item, onSelect }: ListItemParams) => {
  const totalInputs = item.tokenParameters.filter(param => +param.inputAmountPerCollectionStrength > 0)
  const totalOutputs = item.tokenParameters.filter(param => +param.outputAmountPerCollectionStrength > 0)
  return (<tr onClick={() => onSelect(item)}>
    <td><span>{item.name}</span></td>
    <td>
      {totalInputs.length === 0 ?
        (<span>No Inputs</span>) :
        (<span>{totalInputs.map(() => (<i className={styles.redCircle} />))}</span>)
      }
    </td>
    <td>
      {totalOutputs.length === 0 ?
        (<span>No Outputs</span>) :
        (<span>{totalOutputs.map(() => (<i className={styles.greenCircle} />))}</span>)
      }
    </td>
  </tr>)
}


export default ListItem;