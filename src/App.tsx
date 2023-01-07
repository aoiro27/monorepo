import React, { useState } from 'react'
import { Amplify } from 'aws-amplify'
import {
  AmplifyProvider,
  Authenticator,
  Button,
  Flex,
  Link,
  Text,
  TextField,
  View,
} from '@aws-amplify/ui-react'
import aws_exports from './aws-exports'

import '@aws-amplify/ui-react/styles.css'
import theme from './theme'
import Header from './components/Header'
import DeliveryStatusSearch from './components/DeliveryStatusSearch'
import RegisterStatusSearch from './components/RegisterStatusSearch'

Amplify.configure(aws_exports)

const App = () => {

  if(typeof process.env.REACT_APP_IPWHITELIST !== 'undefined'){
  
  fetch('https://ipinfo.io?callback')
  .then(res => res.json())
  .then(json => {
    const whitelist: string = process.env.REACT_APP_IPWHITELIST? process.env.REACT_APP_IPWHITELIST : ""
    for(const ip of whitelist.split(",")){
      if(json.ip == ip){
        return
      }
    }
    window.location.href = `${window.location.href}/error`
  })
  }
  const Menu = {
    Nothing: 0,
    DeliveryMenu: 1,
    RegisterMenu: 2,
  }

  // 最初は何も表示しない
  const [menuId, setMenuId] = useState(Menu.Nothing)

  return (
    <AmplifyProvider theme={theme}>
      <Authenticator>
        {({ signOut, user }) => (
          <Flex
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            alignContent="flex-start"
            wrap="nowrap"
            gap="1rem"
            textAlign="center"
          >
            <Header
              className="header"
              signOut={signOut}
              setMenuId={setMenuId}
              menu={Menu}
            />

            {menuId == Menu.RegisterMenu && <RegisterStatusSearch />}
            {menuId == Menu.DeliveryMenu && <DeliveryStatusSearch />}
          </Flex>
        )}
      </Authenticator>
    </AmplifyProvider>
  )
}

export default App
