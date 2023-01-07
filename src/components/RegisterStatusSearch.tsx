import { useState, useEffect } from 'react';
import RegisterStatusSearchResult from "./RegisterStatusSearchResult";
import "react-datepicker/dist/react-datepicker.css"
import {
    AmplifyProvider,
    Authenticator,
    Button,
    Flex,
    Link,
    Text,
    TextField,
    View,
    Image,
    Grid,
    Card
} from "@aws-amplify/ui-react";

import "./css/register-status-search.css";
import "./types/RegisterStatusResult";
import { RegisterStatusResult } from './types/RegisterStatusResult';

const RegisterStatusSearch = (props: any) => {

    const ResultMenu = {
        Nothing: 0,
        Requested: 1
    };

    const [menuId, setMenuId] = useState(ResultMenu.Nothing);

    const [items, setItems] = useState([]);
    const [emailError, setEmailError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const validate = (mail: string) => {
        const pattern = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

        let isValidate = true;

        if (pattern.test(mail)) {
            setEmailError(false);
        } else {
            setEmailError(true);
            setErrorMsg("正しいメールアドレス形式で入力してください");
            isValidate = false;
        }

        return isValidate;
    }

    const request = () => {
        const mail = (document.getElementById("mail") as HTMLInputElement).value;

        if (!validate(mail)) {
            return;
        }
        setErrorMsg("");

        const url = `${process.env.REACT_APP_API_BASE}registerstatus/${mail}`;
        console.log(url);

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(new Error('エラーです！'));
                }
            })
            .then(json => {
                console.log(json);
                setItems(() => json);
                setMenuId(ResultMenu.Requested);
            })
            .catch(e => {
                console.log(e.message);
            });

    }

    return (
        <>
            <Flex
                direction="row"
                justifyContent="flex-start"
                wrap="nowrap"
                gap="1rem"
                width="80%"
            >
                <Image
                    alt="登録状況確認"
                    src="./img/register-status-confirm.png"
                    objectFit="contain"
                    opacity="100%"
                />
                <Text
                    fontSize={"larger"}
                    fontWeight={"bolder"}
                    color="black"
                >登録状況確認</Text>

            </Flex>

            <Flex
                direction="row"
                justifyContent="flex-start"
                wrap="nowrap"
                gap="1rem"
                width="80%"
            >
                <TextField
                    id="mail"
                    placeholder="登録メールアドレスを入力してください"
                    label="メールアドレス"
                    labelHidden={true}
                    backgroundColor="white"
                    width="350px"
                    opacity="100%"
                    hasError={emailError}
                />
                <Button
                    className='search'
                    onClick={request}>検索</Button>
            </Flex>
            <Text
                    variation="error"
                    as="p"
                    color="red"
                    fontSize="1em"
                    fontStyle="normal"
                    textDecoration="none"
                >
                    {errorMsg}
                </Text>

            {
                menuId == ResultMenu.Requested &&
                <RegisterStatusSearchResult
                    items={items}
                    setItems={setItems}
                />}

        </>
    );
}

export default RegisterStatusSearch;
