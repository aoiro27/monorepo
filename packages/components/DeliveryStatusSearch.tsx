import { useState, useEffect } from 'react'
import DeliveryStatusSearchResult from '@commonlib/components/DeliveryStatusSearchResult'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Button,
  Flex,
  Text,
  TextField,
  View,
  Image,
  Grid,
} from '@aws-amplify/ui-react'

import './css/delivery-status-search.css'
import './types/DeliveryStatusResult'
import { DeliveryStatusResult } from './types/DeliveryStatusResult'

const DeliveryStatusSearch = (props: any) => {
  const ResultMenu = {
    Nothing: 0,
    Requested: 1,
  }

  const [menuId, setMenuId] = useState(ResultMenu.Nothing)

  const emptyItem: DeliveryStatusResult[] = []

  let [items, setItems] = useState(emptyItem)

  const [emailError, setEmailError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const validate = (mail: string, from: string, to: string) => {
    const pattern =
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

    let isValidate = true

    if (pattern.test(mail)) {
      setEmailError(false)
    } else {
      setEmailError(true)
      setErrorMsg('正しいメールアドレス形式で入力してください')
      isValidate = false
    }

    if (from === '' || to === '') {
      setErrorMsg('期間は入力必須です')
      isValidate = false
    }

    return isValidate
  }

  const request = async () => {
    const mail = (document.getElementById('mail') as HTMLInputElement).value
    const from = (
      document.getElementById('from') as HTMLInputElement
    ).value?.replaceAll('-', '')
    const to = (
      document.getElementById('to') as HTMLInputElement
    ).value?.replaceAll('-', '')

    if (!validate(mail, from, to)) {
      return
    }
    setErrorMsg('')
    const url = `${process.env.REACT_APP_API_BASE}deliverystatus?email=${mail}&from=${from}&to=${to}`
    console.log(url)
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(new Error('エラーです！'))
        }
      })
      .then(json => {
        console.log(json)
        setItems(() => json)
        setMenuId(ResultMenu.Requested)
      })
      .catch(e => {
        console.log(e.message)
      })
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
        <Text fontSize={'larger'} fontWeight={'bolder'} color="black">
          配信状況
        </Text>
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
            hasError={emailError}
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
        <input type="date" id="from" />
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
        <input type="date" id="to" />
      </Grid>
      <Button className="search" onClick={request}>
        検索
      </Button>
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
      {menuId == ResultMenu.Requested && (
        <DeliveryStatusSearchResult items={items} setItems={setItems} />
      )}
    </>
  )
}

export default DeliveryStatusSearch
