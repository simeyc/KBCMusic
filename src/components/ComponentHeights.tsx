import React, { FC, useState } from 'react';
import { View } from 'react-native';
import TitleBar from './TitleBar';
import SectionHeader from './SectionHeader';
import SongItem from './SongItem';
import SeparatorLine from './SeparatorLine';

const components = {
    titleBar: <TitleBar title="dummy" />,
    sectionHeader: <SectionHeader title="dummy" data={[]} />,
    songItem: <SongItem data={{ key: 0, number: 0, title: 'dummy' }} />,
    separatorLine: <SeparatorLine />
};

// TODO: use Object.fromEntries(Object.keys(components).map(key => [key, -1]))
const defaultComponentHeights = {
    titleBar: -1,
    sectionHeader: -1,
    songItem: -1,
    separatorLine: -1
};

const ComponentHeightsContext = React.createContext(defaultComponentHeights);

const withComponentHeights = <T extends {}>(Component: FC<T>) => (props: T) => {
    const [heights, setHeights] = useState(defaultComponentHeights);
    return Object.values(heights).includes(-1) ? (
        <>
            {Object.entries(components).map(([key, component]) => (
                <View
                    key={key}
                    style={{ position: 'absolute' }}
                    {...(heights[key as keyof typeof components] === -1 && {
                        onLayout: ({
                            nativeEvent: {
                                layout: { height }
                            }
                        }) =>
                            setHeights(prevHeights => ({
                                ...prevHeights,
                                [key]: height
                            }))
                    })}>
                    {component}
                </View>
            ))}
        </>
    ) : (
        <ComponentHeightsContext.Provider value={heights}>
            <Component {...props} />
        </ComponentHeightsContext.Provider>
    );
};

const useComponentHeights = () => React.useContext(ComponentHeightsContext);

export { withComponentHeights, useComponentHeights };
