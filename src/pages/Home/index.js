import './_Home.scss'
import { iconSearch, logo } from "../../assets"
import { Input, Gap } from '../../components'

const Home = () => {
    return (
        <div className="homepage">
            <img src={logo} width={489} alt="for searching your book" />
            <Gap height={40} />
            <div className="wrapper-search-list">
                <Input style={{ width: 600, height: 50 }} placeholder="Search for literature" />
                <img src={iconSearch} alt="button for searching list book" />
            </div>
        </div>
    )
}

export default Home
