import React from 'react'
import Visual from "../charts/Visual.jsx";
import Dashboard from "../charts/Dashboard.jsx";
import useSample from "./useSample";


export default function Sample() {
    const [data, values] = useSample('axis', 3, 3, 10)

    return (

            <Dashboard datasets={data}>
                <Visual
                    variant={'radar'} values={values} page={0}
                    axis={{label: 'Axis', field: 'axis'}}
                    styles={{width: 'calc(50% - 4px)', height: 'calc(50% - 4px)', backgroundColor: 'var(--fabric-background-primary)'}}
                    title={'Title'}
                />
                <Visual
                    variant={'line'} values={values} page={0}
                    axis={{label: 'Axis', field: 'axis'}}
                    styles={{width: 'calc(50% - 4px)', height: 'calc(50% - 4px)', backgroundColor: 'var(--fabric-background-primary)'}}
                    title={'Title'}
                />
                {/*<Visual*/}
                {/*    variant={'horizontal-bar'} values={values} page={0}*/}
                {/*    axis={{label: 'Axis', field: 'axis'}}*/}
                {/*    styles={{width: 'calc(50% - 4px)', height: 'calc(50% - 4px)', backgroundColor: 'var(--fabric-background-primary)'}}*/}
                {/*    title={'Title'}*/}
                {/*/>*/}
                {/*<Visual*/}
                {/*    variant={'vertical-bar'} values={values} page={0}*/}
                {/*    axis={{label: 'Axis', field: 'axis'}}*/}
                {/*    styles={{width: 'calc(50% - 4px)', height: 'calc(50% - 4px)', backgroundColor: 'var(--fabric-background-primary)'}}*/}
                {/*    title={'Title'}*/}
                {/*/>*/}

                <Visual
                    variant={'pie'} values={values} page={0}
                    axis={{label: 'Axis', field: 'axis'}}
                    styles={{width: 'calc(50% - 4px)', height: 'calc(50% - 4px)', backgroundColor: 'var(--fabric-background-primary)'}}
                    title={'Title'}
                />

            </Dashboard>


    )
}
