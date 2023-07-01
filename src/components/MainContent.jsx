import styles from '../style/MainContent.module.css';

export default function MainContent(props) {
    return (
        <div className={styles.content}>
            <div className={`${styles.container} container-fluid`}>
                <div className="row" style={{padding: 0}}>
                    <div className="col-2">
                        {props.children[0]}
                    </div>
                    <div className="col-10 text-center">
                        {props.children[1]}
                    </div>
                </div>
            </div>
        </div>
    );
}