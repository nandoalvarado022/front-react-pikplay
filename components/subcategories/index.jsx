import Link from "next/link"
import { getSubcategories } from "../../lib/utils"
import styles from "./subcategories.module.scss"

const Subcategories = () => {
  const list = getSubcategories()
  return <div className={styles.subcategories}>
    <ul>
      {
        list.map(item => <Link href={item.url}>
          <a className="">
            <h2>
              {item.name}
            </h2>
          </a>
        </Link>
        )
      }
    </ul>
  </div>
}

export default Subcategories