import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_actions';

function CartPage(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        let cartItems = []
        
        // Redux 의 User state 안에 cart 안에 상품이 들어있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                // 원래 axios 를 해야 하는데, 현재 Redux 를 이용하고 있으므로 대신 dispatch 실행
                dispatch(getCartItems(cartItems, props.user.userData.cart))

            } else {

            }
        }

    }, [props.user.userData])

    return (
        <div>
            CartPage
        </div>
    )
}

export default CartPage
