import { useEthers, useEtherBalance } from "@usedapp/core"
import { formatEther } from "@ethersproject/units";
import { Box, Button } from "@material-ui/core"

export default function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <Box p={3}>
      <Button onClick={() => activateBrowserWallet()} color="secondary" variant="contained">Connect to Wallet</Button>
    </Box>
  )
}