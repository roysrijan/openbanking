import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from '../global/globalColors';

export type ExpandableDrawerProps = DrawerContentComponentProps & {
  title: string;
  choices: Map<string, string>;
};

export default class ExpandableDrawer extends React.Component<
  ExpandableDrawerProps,
  {
    isExpanded: boolean;
  }
> {
  constructor(props: ExpandableDrawerProps, state: { isExpanded: boolean }) {
    super(props);
    this.state = state;
  }

  onPress = (): void => {
    this.setState(() => {
      return {
        isExpanded: !this.state.isExpanded,
      };
    });
  };

  render = (): JSX.Element => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.onPress}
          style={styles.heading}
        >
          <Text style={styles.expander}>{this.props.title}</Text>
        </TouchableOpacity>

        {this.state.isExpanded ? (
          <DrawerContentScrollView>
            <View style={styles.expandedItem}>
              {[...this.props.choices.keys()].map(
                (label: string): JSX.Element | null => {
                  const screen = this.props.choices.get(label);
                  if (screen != undefined) {
                    return (
                      <DrawerItem
                        key={label}
                        label={label}
                        activeTintColor={COLORS.blue}
                        inactiveTintColor={COLORS.blue}
                        onPress={(): void => {
                          this.props.navigation.navigate(screen);
                        }}
                        icon={({ focused, size }) => (
                          <Icon
                            name={label.includes('Payment') ? "payment" : "account-balance"}
                            size={size}
                            color={COLORS.blue}
                          />)}
                      />
                    );
                  } else {
                    return null;
                  }
                }
              )}
            </View>
          </DrawerContentScrollView>
        ) : null}
      </View>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    borderRadius: 15,
  },
  heading: {

  },
  expander: {
    color: COLORS.blue,
  },
  expandedItem: {

  },
});