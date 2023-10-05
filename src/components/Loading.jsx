import styles from '@/style/MainContent.module.css'

export default function Loading(props) {

    // used mainly for "Loading..." screen in main content area, but also to display big error
    // or warning messages in the same place

    // will load 100% width loading screen or 88% loading screen depending on the prop passed

    return (
        <div className={styles[props.styles]}>
            { props.txt }
        </div>
    )
}