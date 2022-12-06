import COLOR from '@assets/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

function useHideBottomTab() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('debug: routeName: ', route);

  useLayoutEffect(() => {
    // const routeName = getFocusedRouteNameFromRoute(route);
    // console.log('debug: route name: ', routeName);

    if (route.name === 'AddTransaction') {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none'
        }
      });
    } else {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          backgroundColor: COLOR.black,
          marginTop: 5
        }
      });
    }
  }, [navigation, route]);
}

export default useHideBottomTab;
