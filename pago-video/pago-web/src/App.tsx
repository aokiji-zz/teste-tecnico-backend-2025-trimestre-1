import { Provider } from 'react-redux'
import RootNavigation from './app/navigation/RootNavigation'
import { store } from './app/redux/store'
import 'react-notifications/lib/notifications.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useAppDispatch } from './app/redux/hooks'
import { useEffect, useState } from 'react'
import { setAuthenticatedUser } from './app/redux/slices/auth.slice'
function App() {
  const dispatch = useAppDispatch()
  const [finsihedInitialize, setFinsihedInitialize] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userFromStorage = JSON.parse(user)
      console.log('userFromStorage', userFromStorage)
      dispatch(setAuthenticatedUser(userFromStorage))
    }
    setFinsihedInitialize(true)
  }, [dispatch])

  return (
    <div className='App'>
      {finsihedInitialize ? (
        <Provider store={store}>
          <RootNavigation />
        </Provider>
      ) : (
        <></>
      )}
    </div>
  )
}

export default App
