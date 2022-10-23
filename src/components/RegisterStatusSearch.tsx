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

    const baseItems: RegisterStatusResult[] =[ 
        { 
            registerdMail: "hoge@yahoo.co.jp",
            oneUid: "1234567890",
            isPaidUser: true,
            tags:[
                {
                    tagName: "MyCar",
                    mailItems: [
                        {
                            deliveryMail:"hoge2@yahoo.co.jp",
                            isAuthenticated: true
                        },
                        {
                            deliveryMail:"hoge9@yahoo.co.jp",
                            isAuthenticated: true
                        },
                        {
                            deliveryMail:"hoge3@yahoo.co.jp",
                            isAuthenticated: false
                        }
                    ]
                },
                {
                    tagName: "Kids",
                    mailItems: [
                        {
                            deliveryMail:"kids1@yahoo.co.jp",
                            isAuthenticated: false
                        },
                        {
                            deliveryMail:"kids9@yahoo.co.jp",
                            isAuthenticated: true
                        },
                        {
                            deliveryMail:"kids1234@yahoo.co.jp",
                            isAuthenticated: false
                        }
                    ]
                },
                {
                    tagName: "Wallet",
                    mailItems: [
                        {
                            deliveryMail:"wallet@yahoo.co.jp",
                            isAuthenticated: true
                        },
                        {
                            deliveryMail:"wallet2@yahoo.co.jp",
                            isAuthenticated: false
                        },
                        {
                            deliveryMail:"wallet3@yahoo.co.jp",
                            isAuthenticated: false
                        }
                    ]
                },
            ]
        }
    ];

    const emptyItem: RegisterStatusResult[] = []

    let [items, setItems] = useState(emptyItem);

    const request = () => {
        const val = document.getElementById("mail") as HTMLInputElement;

        let tmp = [...baseItems].filter(x => {
            return x.registerdMail == val.value;
        });
        console.log(tmp);
        setItems(() => tmp);
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

            <Flex
                direction="row"
                justifyContent="flex-start"
                wrap="nowrap"
                gap="1rem"
                width="80%"
            >
                <Text
                    fontSize={"larger"}
                    fontWeight={"bolder"}
                    color="black"
                >検索結果</Text>

            </Flex>
            <Flex
                direction="row"
                justifyContent="flex-start"
                wrap="nowrap"
                gap="1rem"
                width="80%"
            >
            <RegisterStatusSearchResult
                items={items[0]}
                setItems={setItems}
            />
            </Flex>
        </>
    );
}

export default RegisterStatusSearch;
