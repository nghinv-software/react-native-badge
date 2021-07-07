/**
 * Created by nghinv on Fri Jun 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
  ViewProps,
  TextProps,
} from 'react-native';
import equals from 'react-fast-compare';

const LABEL_FORMATTER_VALUES = [1, 2, 3, 4] as const;

export enum BADGE_SIZES {
  pimpleSmall = 6,
  pimpleBig = 10,
  pimpleHuge = 14,
  small = 16,
  default = 20,
  large = 24,
}

type LabelFormatterValues = typeof LABEL_FORMATTER_VALUES[number];
export type BadgeSizes = keyof typeof BADGE_SIZES;

export interface BadgeProps extends ViewProps {
  label?: string;
  size?: BadgeSizes | number;
  labelColor?: string;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle;
  labelFormatterLimit?: LabelFormatterValues;
  labelProps?: TextProps;
}

Badge.defaultProps = {
  size: BADGE_SIZES.default,
  labelColor: 'white',
  backgroundColor: '#f44336',
};

function Badge(props: BadgeProps) {
  const {
    label,
    size,
    labelColor,
    backgroundColor,
    containerStyle,
    labelStyle,
    labelFormatterLimit,
    labelProps,
    ...rest
  } = props;

  const viewSize = typeof size === 'number' ? size : BADGE_SIZES[size as BadgeSizes];
  const textSize = viewSize - 4;
  const hasLabel = label !== undefined && label !== null;

  const getLabel = useCallback(() => {
    if (LABEL_FORMATTER_VALUES.includes(labelFormatterLimit!)) {
      const maxNumber = 10 ** labelFormatterLimit! - 1;

      return parseInt(label!) > maxNumber ? `${maxNumber}+` : label;
    }

    return label;
  }, [labelFormatterLimit, label]);

  return (
    <View
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor,
          height: viewSize,
          borderRadius: viewSize / 2,
          minWidth: viewSize,
          paddingHorizontal: hasLabel ? 4 : 0,
        },
        containerStyle,
      ]}
    >
      {
        hasLabel && (
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            {...labelProps}
            style={[
              styles.label,
              {
                fontSize: textSize,
                lineHeight: textSize + 4,
                color: labelColor,
              },
              labelStyle,
            ]}
          >
            {getLabel()}
          </Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  label: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default React.memo(Badge, equals);
