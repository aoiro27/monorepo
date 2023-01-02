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

    const [menuId,setMenuId] = useState(ResultMenu.Nothing);

    const baseItems: RegisterStatusResult[] = [
        {
            registerdMail: "hoge@yahoo.co.jp",
            oneUid: "1234567890",
            isPaidUser: true,
            registerItems: [
                {
                    tagName: "MyCar",

                    deliveryMail: "hoge2@yahoo.co.jp",
                    isAuthenticated: true
                },
                {
                    tagName: "MyCar",
                    deliveryMail: "hoge9@yahoo.co.jp",
                    isAuthenticated: true
                },
                {
                    tagName: "MyCar",
                    deliveryMail: "hoge3@yahoo.co.jp",
                    isAuthenticated: false
                }

                ,
                {
                    tagName: "Kids",
                    deliveryMail: "kids1@yahoo.co.jp",
                    isAuthenticated: false
                },
                {
                    tagName: "Kids",
                    deliveryMail: "kids9@yahoo.co.jp",
                    isAuthenticated: true
                },
                {
                    tagName: "Kids",
                    deliveryMail: "kids1234@yahoo.co.jp",
                    isAuthenticated: false
                }
                ,
                {
                    tagName: "Wallet",
                    deliveryMail: "wallet@yahoo.co.jp",
                    isAuthenticated: true
                },
                {
                    tagName: "Wallet",
                    deliveryMail: "wallet2@yahoo.co.jp",
                    isAuthenticated: false
                },
                {
                    tagName: "Wallet",
                    deliveryMail: "wallet3@yahoo.co.jp",
                    isAuthenticated: false
                }
            ]
        }
    ];

    const emptyItem: RegisterStatusResult[] = []

    const [items, setItems] = useState(emptyItem);

    const request = () => {
        const mail = (document.getElementById("mail") as HTMLInputElement).value;

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
                />
                <Button
                    className='search'
                    onClick={request}>検索</Button>
            </Flex>

            {   
                menuId == ResultMenu.Requested && 
                <RegisterStatusSearchResult
                items={items[0]}
                setItems={setItems}
            />}

        </>
    );
}

export default RegisterStatusSearch;
