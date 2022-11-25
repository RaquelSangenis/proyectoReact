import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CartListItem({prod, removeProd}) {

  return <tr>
            <td>{prod.isTotalRow ? 'Total' : prod.name}</td> 
            <td>{prod.quantity}</td> 
            <td>${prod.price}</td>
            {
              !prod.isTotalRow ?
                <td onClick={removeProd}>
                  <FontAwesomeIcon className='icon trash-icon' icon={faTrash}/>
                </td>
                : <td></td>
            }
            <td></td>
               
        </tr>
}
