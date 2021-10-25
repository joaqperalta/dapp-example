import { useState } from "react"
import { useEthers, useEtherBalance } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import { Box, Button, Typography } from "@material-ui/core"
import Identicon from "./identIcon"
import AccountModal from './accountModal'

export default function ConnectButton() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    <Box p={3}>
      {etherBalance ? (
        <Box
          pl={1}
          display="flex"
          alignItems="center"
          borderRadius="20px"
          bgcolor="#292c46"
        >
          <Box pr={1}>
            <Typography variant="h7" color="white">
              {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)}{" "}
              ETH
            </Typography>
          </Box>
          <Box 
            border="1px solid"
            bgcolor="#05182b"
            borderRadius="20px"
          >
            <Button onClick={handleOpen} >
              <Typography color="white" variant="h7" style={{paddingRight:"10px"}} >
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Typography>
              <Identicon />
            </Button>
          </Box>
          <AccountModal open={open} handleClose={handleClose} />
        </Box>
      ) : (
        <Button
          onClick={() => activateBrowserWallet()}
          color="secondary"
          variant="contained"
        >
          Connect to Wallet
        </Button>
      )}
    </Box>
  );
}
