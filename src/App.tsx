import React from "react";
import { Amplify } from "aws-amplify";
import {
  AmplifyProvider,
  Authenticator,
  Button,
  Flex,
  Link,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import aws_exports from "./aws-exports";

import "@aws-amplify/ui-react/styles.css";
import theme from "./theme";
import Header from './components/Header';
import DeliveryStatusSearch from './components/DeliveryStatusSearch';

Amplify.configure(aws_exports);

const App = () => {
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
            <Header className="header" signOut={signOut} />
    
            <DeliveryStatusSearch />

          </Flex>
        )}
      </Authenticator>
    </AmplifyProvider>
  );
};

export default App;