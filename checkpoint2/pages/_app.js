import '@/styles/globals.css'
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import { polygon, polygonMumbai} from "wagmi/chains";
const chains = [polygonMumbai,polygon];

const client = createClient(
  getDefaultClient({
    appName: "CheckPoint 1",
    chains
  }),
);


export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
  <Component {...pageProps} />
      </ConnectKitProvider>
      </WagmiConfig>
  )
}
