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
import { DeliveryStatusResult } from './types/DeliveryStatusResult';

const DeliveryStatusSearchResult = (props: any) => {

    const [mailToggle, setMailToggle] = useState(true);
    const [timestampToggle, setTimestampToggle] = useState(true);
    const [stationToggle, setStationToggle] = useState(true);
    const [tagToggle, setTagToggle] = useState(true);

    const sortMail = () => {
        setMailToggle(!mailToggle);
        props.setItems(
            props.items.sort((a: DeliveryStatusResult, b: DeliveryStatusResult) => {
                if (mailToggle) {
                    return (a.mail >= b.mail) ? -1 : 1
                } else {
                    return (a.mail <= b.mail) ? -1 : 1
                }
            }));
    }

    const sortTimestamp = () => {
        setTimestampToggle(!timestampToggle);
        props.setItem(
            props.items.sort((a: DeliveryStatusResult, b: DeliveryStatusResult) => {
                if (timestampToggle) {
                    return (a.timestamp >= b.timestamp) ? -1 : 1
                } else {
                    return (a.timestamp <= b.timestamp) ? -1 : 1
                }
            }));
    }

    const sortStation = () => {
        setStationToggle(!stationToggle);
        props.setItem(
            props.items.sort((a: DeliveryStatusResult, b: DeliveryStatusResult) => {
                if (stationToggle) {
                    return (a.station >= b.station) ? -1 : 1
                } else {
                    return (a.station <= b.station) ? -1 : 1
                }
            }));
    }

    const sortTag = () => {
        setTagToggle(!tagToggle);
        props.setItem(
            props.items.sort((a: DeliveryStatusResult, b: DeliveryStatusResult) => {
                if (tagToggle) {
                    return (a.tag >= b.tag) ? -1 : 1
                } else {
                    return (a.tag <= b.tag) ? -1 : 1
                }
            }));
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
                <Text
                    fontSize={"larger"}
                    fontWeight={"bolder"}
                    color="black"
                >検索結果</Text>

            </Flex>
            <Table
                highlightOnHover={true}
                variation="striped"
                size="small"
                backgroundColor={"white"}
                width="70%"
            >
                <TableHead>
                    <TableRow>
                        <TableCell as="th" onClick={sortMail}>配信メールアドレス</TableCell>
                        <TableCell as="th" onClick={sortTimestamp}>日時</TableCell>
                        <TableCell as="th" onClick={sortStation}>駅名</TableCell>
                        <TableCell as="th" onClick={sortTag}>タグ名</TableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    {props.items.map((item: DeliveryStatusResult,index:React.Key) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{item.mail}</TableCell>
                                <TableCell>{item.timestamp}</TableCell>
                                <TableCell>{item.station}</TableCell>
                                <TableCell>{item.tag}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}

export default DeliveryStatusSearchResult;
