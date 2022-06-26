import '../styles/globals.css'
import instace from 'axios-instance'//importamos las instancias de axios para no estar repitiendolas
import { QueryClient, QueryClientProvider} from 'react-query'
import instance from 'axios-instance'

//obteniamos esto
const defaultQueryFn = async ({queryKey}) =>{
  const {data}= await instance.get(queryKey[0])
  return data;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn:defaultQueryFn,
    },
  },
})

function MyApp({ Component, pageProps }) {
  return(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps}/>
      </QueryClientProvider>
  )
}

export default MyApp
