"""Recreate product user reviews relationship

Revision ID: 088ffc61c60e
Revises: 6c2e3c04b769
Create Date: 2023-06-28 07:43:15.647270

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '088ffc61c60e'
down_revision = '6c2e3c04b769'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('product_users')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product_users',
    sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name='fk_product_users_product_id_products'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_product_users_user_id_users')
    )
    # ### end Alembic commands ###