import { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { TemplateGroup } from '../models/template-groups.model';
import { getTemplateGroups } from '../services/template-groups.service';
import ResourceInfoModal from './ResourceInfoModal';
import styles from './ResourcesList.module.css';
import ListItem from './ResourcesListItem';


const ResourcesList = () => {
  const { data: list, error, loading, load } = getTemplateGroups();
  const [selectedItem, setSelectedItem] = useState<TemplateGroup | null>(null);
  const [viewRows, setViewRows] = useState(0);
  const closeModal = () => setSelectedItem(null);
  const showNextRow = () => {
    setTimeout(() => setViewRows(viewRows + 1), 33)
  }
  useEffect(() => load(), [])


  return (<div className={styles.resourcesList}>
    <CSSTransition in={!loading && list?.length > 0}
      timeout={500}
      mountOnEnter
      classNames={{
        enter: styles.resourcesListIn,
        enterActive: styles.resourcesListInActive
      }}
    >
      <Fragment>
        <h2>Resources</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Inputs (Consumption)</th>
              <th>Outputs (Production)</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, idx) => (
              <CSSTransition in={viewRows >= idx}
                appear
                key={item.key}
                timeout={500}
                mountOnEnter
                onEnter={() => showNextRow()}
                classNames={{
                  enter: styles.rowIn,
                  enterActive: styles.rowInActive
                }}
              >
                <ListItem item={item} onSelect={setSelectedItem} />
              </CSSTransition>
            ))}
          </tbody>
        </table>
      </Fragment>
    </CSSTransition>
    <ResourceInfoModal item={selectedItem} onClose={closeModal} />
  </div>
  )

}

export default ResourcesList;