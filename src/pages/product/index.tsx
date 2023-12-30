interface Props extends WithClassName {}

const ProductView = memo((props: Props) => {
  const { className } = props
  return <div className={className}>Product</div>
})

const Product = styled(ProductView)``

Product.displayName = 'Product'
ProductView.displayName = 'ProductView'
export default Product
