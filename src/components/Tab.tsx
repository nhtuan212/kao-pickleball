import { TabsProps, Tabs as TabsHeroUI, TabProps } from "@heroui/react";

const Tab = ({ children, panels, ...props }: TabsProps & { panels?: React.ReactNode }) => {
    return (
        <TabsHeroUI {...props}>
            <TabsHeroUI.ListContainer>
                <TabsHeroUI.List aria-label="Options">{children}</TabsHeroUI.List>
            </TabsHeroUI.ListContainer>

            {panels}
        </TabsHeroUI>
    );
};

const TabItem = ({ children, ...props }: TabProps) => {
    return (
        <TabsHeroUI.Tab {...props}>
            {children as React.ReactNode}
            <TabsHeroUI.Indicator />
        </TabsHeroUI.Tab>
    );
};

Tab.Tab = TabItem;
Tab.Panel = TabsHeroUI.Panel;

export { Tab };
