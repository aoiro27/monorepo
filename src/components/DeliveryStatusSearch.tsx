import { useState, useEffect } from 'react';
import DeliveryStatusSearchResult from "./DeliveryStatusSearchResult";
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

import "./css/delivery-status-search.css"

type resultItem = {
    mail: string;
    timestamp: string;
    station: string;
    tag: string;
};
const DeliveryStatusSearch = (props: any) => {

    const baseItems: resultItem[] = [
        { mail: "hoge1@yahoo.co.jp", timestamp: "2022-09-18 10:22:30", station: "新宿", tag: "MyCar" },
        { mail: "hoge3@yahoo.co.jp", timestamp: "2022-09-20 11:22:10", station: "守谷", tag: "MyCar" },
        { mail: "hoge5@yahoo.co.jp", timestamp: "2022-09-21 10:22:30", station: "新宿", tag: "Kids" },
        { mail: "hoge2@yahoo.co.jp", timestamp: "2022-09-22 12:22:10", station: "原宿", tag: "MyCar" },
        { mail: "hoge1@yahoo.co.jp", timestamp: "2022-09-30 10:22:30", station: "新宿", tag: "Kids" },
        { mail: "hoge2@yahoo.co.jp", timestamp: "2022-10-01 13:22:20", station: "浅草", tag: "MyCar" },
        { mail: "hoge1@yahoo.co.jp", timestamp: "2022-10-02 10:22:30", station: "新宿", tag: "MyCar" },
    ];

    const emptyItem: resultItem[] = []

    let [items,setItems] = useState(emptyItem);
  
    const request = () => {
        const val = document.getElementById("mail") as HTMLInputElement;
            
        let tmp = [...baseItems].filter(x => {
            return x.mail == val.value;
        });
        setItems(()=>tmp);
        console.log(tmp);
        console.log(items);
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
                    alt="配信状況確認"
                    src="./img/delivery-status-confirm.png"
                    objectFit="contain"
                    opacity="100%"
                />
                <Text
                    fontSize={"larger"}
                    fontWeight={"bolder"}
                    color="black"
                >配信状況</Text>

            </Flex>
            <Grid
                columnGap="5px"
                rowGap="5px"
                templateColumns="130px 250px 20px 250px"
                templateRows="1fr 1fr"
            >
                <View>
                    <Text
                        variation="primary"
                        as="p"
                        color="black"
                        fontSize="1em"
                        fontStyle="normal"
                        textDecoration="none"
                    >
                        メールアドレス
                    </Text>
                </View>
                <View columnSpan={3}>
                    <TextField
                        id="mail"
                        placeholder="配信メールアドレスを入力してください"
                        label="メールアドレス"
                        labelHidden={true}
                        backgroundColor="white"
                    />
                </View>
                <Text
                    variation="primary"
                    as="p"
                    color="black"
                    fontSize="1em"
                    fontStyle="normal"
                    textDecoration="none"
                >
                    期間
                </Text>
                <input type="date" />
                <Text
                    variation="primary"
                    as="p"
                    color="black"
                    fontSize="1em"
                    fontStyle="normal"
                    textDecoration="none"
                >
                    ～
                </Text>
                <input type="date" />
            </Grid>
            <Button
                className='search'
                onClick={request}>検索</Button>

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

            <DeliveryStatusSearchResult
                items={items}
            />
        </>
    );
}

export default DeliveryStatusSearch;
