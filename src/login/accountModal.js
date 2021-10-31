import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Typography,
  Modal,
  ModalContent,
  Grid,
  IconButton,
  Link,
  Input,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CallMadeIcon from '@mui/icons-material/CallMade'
import Identicon from "./identIcon"
import { useEthers, useEtherBalance, useSendTransaction } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { utils } from 'ethers'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  width: "90%",
  bgcolor: "#24263c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  pt: 1,
  borderRadius: "20px",
};

export default function BasicModal({ open, handleClose }) {
  const { sendTransaction, state } = useSendTransaction()
  const { account, deactivate } = useEthers()
  const etherBalance = useEtherBalance(account)
  const [copyButVal, setCopyButVal] = useState("Copy Address")
  const [recAddr, setRecAddr] = useState("")
  const [ethVal, setEthVal] = useState('0')
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (state.status != 'Mining') {
      setDisabled(false)
      setEthVal('')
      setRecAddr('')
    }
  }, [state])
  const handleDeactivateAccount = () => {
    deactivate()
    handleClose()
  }
  const changeCopyVal = () => {
    setCopyButVal("Copied")
    setTimeout(() => {
      setCopyButVal("Copy Address")
    }, 2000)
  }
  const handleSend = () => {
    setDisabled(true)
    sendTransaction({ to: recAddr, value: utils.parseEther(ethVal) })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" mb={2}>
          <Box sx={{ p: 1, flexGrow: 1 }}>
            <Typography variant="h6">Account</Typography>
          </Box>
          <Box>
            <IconButton
              size="small"
              border="1px solid white"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ border: "1px solid grey", borderRadius: "10px" }} p={2}>
          <Box sx={{ display: "flex" }} alignItems="center">
            <Typography style={{ flexGrow: 1, color: "grey" }}>
              Connected with metamask
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDeactivateAccount}
            >
              Change
            </Button>
          </Box>
          <Box
            style={{
              display: "flex",
            }}
            alignItems="center"
          >
            <Identicon />
            <Typography
              color="white"
              variant="h6"
              style={{ paddingLeft: "10px" }}
            >
              {account &&
                `${account.slice(0, 6)}...${account.slice(
                  account.length - 4,
                  account.length
                )}`}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CopyToClipboard text={account}>
              <Button
                style={{ textTransform: "capitalize" }}
                onClick={changeCopyVal}
              >
                <ContentCopyIcon mr={1} />
                {copyButVal}
              </Button>
            </CopyToClipboard>
            <Link
              href={`https://ropsten.etherscan.io/address/${account}`}
              underline="none"
              style={{ alignItems: "center", color: "white", display: "flex" }}
            >
              <CallMadeIcon />
              <Typography variant="h7">
                View on Explorer
              </Typography>
            </Link>
          </Box>
        </Box>

        <Box border="1px solid grey" borderRadius="10px" m={2} py={2} px={4}>
          <Box border="1px solid white" mb={1} >
            <Input value={recAddr} fullWidth placeholder="Receiver Address" onChange={(ev) => setRecAddr(ev.target.value)} />
          </Box>
          <Box border="1px solid white" mb={1} >
            <Input value={ethVal} fullWidth placeholder="ETH Amount" onChange={(ev) => setEthVal(ev.target.value)} />
          </Box>
          <Box textAlign="center" >
            <Button color="primary" variant="contained" onClick={handleSend} disabled={disabled} >Send</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
