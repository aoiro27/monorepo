import {
    AmplifyProvider,
    Authenticator,
    Button,
    Flex,
    Link,
    Text,
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    TextField,
    View,
    Image,
    Grid,
    Card
} from "@aws-amplify/ui-react";
import { useState } from "react";
import "./css/register-status-search.css";
import { RegisterStatusResult, RegisterItem } from "./types/RegisterStatusResult";


const RegisterStatusSearchResult = (props: any) => {

    let prevTagName = "";

    return (
        <>
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
                <Table
                    highlightOnHover={true}
                    variation="striped"
                    size="small"
                    backgroundColor={"white"}
                    width="70%"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">登録メールアドレス</TableCell>
                            <TableCell as="th">ONE UID</TableCell>
                            <TableCell as="th">会員ステータス</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        <TableRow>
                            <TableCell>{props.items?.registerdMail ? props.items?.registerdMail : "未登録"}</TableCell>
                            <TableCell>{props.items?.oneUid ? props.items?.oneUid : "-"}</TableCell>
                            <TableCell>{props.items?.isPaidUser ? props.items?.isPaidUser ? "有償" : "フリー" : "-"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
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
                >タグ一覧</Text>
                <Text
                    color="black"
                >{Array.from(
                    new Map(props.items?.registerItems.map((x: RegisterItem) => [x.deliveryMail, x.deliveryMail])).values()
                ).length}件</Text>
            </Flex>

            <Flex
                direction="row"
                justifyContent="flex-start"
                wrap="nowrap"
                gap="1rem"
                width="80%"
            >
                <Table
                    highlightOnHover={true}
                    variation="striped"
                    size="small"
                    backgroundColor={"white"}
                    width="70%"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">タグ名</TableCell>
                            <TableCell as="th">配信メールアドレス</TableCell>
                            <TableCell as="th">認証ステータス</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {props.items?.registerItems?.map((item: RegisterItem,index:React.Key) => {
                            const tagName = prevTagName == item.tagName ? "" : item.tagName;
                            prevTagName = item.tagName;
                            return (
                                <TableRow key={index}>
                                    <TableCell>{tagName}</TableCell>
                                    <TableCell>{item.deliveryMail}</TableCell>
                                    <TableCell>{item.isAuthenticated ? "認証済み" : "未認証"}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Flex>
        </>
    );
}

export default RegisterStatusSearchResult;
