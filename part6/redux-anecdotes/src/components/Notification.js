import { useSelector } from "react-redux"
import notificationReducer from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  style.display = notification[0].length > 1 ? '' : 'none'
  console.log(style)
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification