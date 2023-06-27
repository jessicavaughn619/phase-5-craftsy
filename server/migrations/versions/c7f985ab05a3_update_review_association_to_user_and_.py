"""Update review association to user and product

Revision ID: c7f985ab05a3
Revises: 55cc5be28fe4
Create Date: 2023-06-27 15:45:13.463185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c7f985ab05a3'
down_revision = '55cc5be28fe4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product_users',
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_product_users_product_id_products')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_product_users_user_id_users'))
    )
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('product_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_reviews_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_reviews_product_id_products'), 'products', ['product_id'], ['id'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    op.drop_table('users')
    # ### end Alembic commands ###
