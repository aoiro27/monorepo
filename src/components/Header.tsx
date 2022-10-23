import {
    AmplifyProvider,
    Authenticator,
    Button,
    Flex,
    Link,
    Text,
    TextField,
    View,
    Image
} from "@aws-amplify/ui-react";
import { useState } from "react";

import "./css/header.css";

const Header = (props: any) => {

    console.log(props)

    return (
        <Flex
            direction="row"
            wrap="nowrap"
            gap="1rem"
            className="header"
        >
            <Image
                alt="登録状況確認"
                src="./img/register-status-confirm.png"
                objectFit="initial"
                backgroundColor="initial"
                opacity="100%"
            />

            <Link
                className="header-menu"
                onClick={()=>{props.setMenuId(props.menu.RegisterMenu)}}
                color="#000"
            >
                登録状況確認
            </Link>
            <Image
                alt="配信状況確認"
                src="./img/delivery-status-confirm.png"
                objectFit="initial"
                backgroundColor="initial"
                opacity="100%"
            />
            <Link
                className="header-menu"
                onClick={()=>{props.setMenuId(props.menu.DeliveryMenu)}}
                color="#000"
            >
                配信状況確認
            </Link>
            <Button
                onClick={props.signOut}
                className="sign-out"
            >
                サインアウト
            </Button>
        </Flex>
    );
}

export default Header;
