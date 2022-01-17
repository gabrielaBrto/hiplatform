import React, { useState } from 'react';

const ListItem = (props) => {
    const [data, setData] = useState(props.data);
    const [displayChildren, setDisplayChildren] = useState({});

    const checkChange = (event, targetNode) =>{
        const targetNodeId = targetNode.id;
        
        findIndexNestedforCheckbox(targetNode, targetNodeId);
    }
    
    const findIndexNestedforCheckbox = (dataItem, index) => {
        if (dataItem.id === index){
            dataItem.isChecked = true;
        }

        let result;

       const i = Object.entries(dataItem.children).findIndex(([key, child]) => {
            
            child.isChecked = true;

            return (result = findIndexNestedforCheckbox(child, index));
        });
        if (result) return [i, ...result];

    }

    return (
        <ul>
            {Object.entries(data).map(([key, item])=>(
                <li key={key}>
                    {item.children && (
                        <>
                        <input
                        type="checkbox"
                        onChange={(e) => checkChange(e, item)}
                        checked={item.isChecked}
                        />
                        <span
                            onClick={() => {
                                setDisplayChildren({ ...displayChildren, [item.name]: !displayChildren[item.name] });
                            }}
                        >
                        {displayChildren[item.name] ? ' <' : '>'}{' '}{item.name}
                        </span>
                        </>
                    )}
                    {displayChildren[item.name] && item.children && <ListItem data={item.children}/>}
                </li>
            ))}
        </ul>
        
    )
}
export default ListItem;
