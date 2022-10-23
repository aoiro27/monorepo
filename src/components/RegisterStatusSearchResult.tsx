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
import { RegisterStatusResult } from "./types/RegisterStatusResult";


const RegisterStatusSearchResult = (props: any) => {

    return (
        <>
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
                        <TableCell>{props.items?.registerdMail}</TableCell>
                        <TableCell>{props.items?.oneUid}</TableCell>
                        <TableCell>{props.items?.isPaidUser?"有償":"フリー"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}

export default RegisterStatusSearchResult;
